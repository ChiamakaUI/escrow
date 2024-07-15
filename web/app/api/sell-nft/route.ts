import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
  MEMO_PROGRAM_ID,
  createPostResponse,
  ActionPostResponse,
  ActionPostRequest,
} from '@solana/actions';

import {
  Transaction,
  PublicKey,
  TransactionInstruction,
  ComputeBudgetProgram,
  Connection,
  clusterApiUrl,
} from '@solana/web3.js';

export const GET = (req: Request) => {
  const url = new URL(req.url);
  const icon = url.searchParams.get('icon');
  const description = url.searchParams.get('description');
  const title = url.searchParams.get('title');
  const price = url.searchParams.get('price');

  if (!icon || !description || !title || !price) {
    return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...ACTIONS_CORS_HEADERS },
    });
  }

  const payload: ActionGetResponse = {
    icon,
    description,
    title,
    label: `${price} sol`,
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
        data: Buffer.from('this is a simple message', 'utf8'),
        keys: [],
      })
    );
    transaction.feePayer = account;

    const connection = new Connection(clusterApiUrl('devnet'));
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    return Response.json('An unknown error occured', { status: 400 });
  }
};
