import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
  MEMO_PROGRAM_ID,
  createPostResponse,
  ActionPostResponse,
  ActionPostRequest,
} from "@solana/actions";

import {
  Transaction,
  PublicKey,
  TransactionInstruction,
  ComputeBudgetProgram,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";


export const GET = (req: Request) => {
  const payload: ActionGetResponse = {
    icon: "https://res.cloudinary.com/adaeze/image/upload/v1712587387/iekfebkgowfor9dqp8la.jpg",
    description:
      "Nike Air cushioning is a lightweight, durable and industry-leading innovation that absorbs impact and shifts energy back into performance, all in flawless comfort.",
    title: "Nike Air",
    label: "Buy Now",
  };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();

    const account: PublicKey = new PublicKey(body.account);

    const transaction = new Transaction();

    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),

      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from("this is a simple message", "utf8"),
        keys: [],
      })
    );
    transaction.feePayer = account;

    const connection = new Connection(clusterApiUrl("devnet"));
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
      },
    });

    console.log(payload);
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    return Response.json("An unknown error occured", { status: 400 });
  }
};
