import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type TransactionFormProps = {
  setStage: Function;
  setDetails: Function;
};

type FormData = {
  name: string
  price: number
  duration: string
  stages: number
}

const TransactionForm = ({ setStage, setDetails }: TransactionFormProps) => {
  const validation = yup.object().shape({
    name: yup.string().required('Please, name your quiz'),
    price: yup.number().required('Please, enter number of questions'),
    duration: yup.string().required('Please, enter reward amount in USDC'),
    stages: yup.number().required('Please, enter number of questions'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = (values: FormData) => {
    setStage((prev: number) => prev + 1);
    setDetails(values)
  };
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Start Transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="">Name</p>
          <input
            type="text"
            placeholder=""
            className="w-full bg-gray-800 rounded p-2 mb-3"
            {...register("name")}
          />
          <p className="text-red-500 text-xs">{errors.name?.message}</p>
        </div>
        <div className="">
          <p className="">Price</p>
          <div className="flex mb-3">
            <input
              type="number"
              placeholder="For $"
              className="bg-gray-800 rounded p-2 mr-2 w-2/3"
              {...register("price")}
            />
            <p className="bg-gray-800 rounded p-2 w-1/3">USDC</p>
          </div>
          <p className="text-red-500 text-xs">{errors.price?.message}</p>
        </div>
        <div className="">
          <p className="">Duration</p>
          <input
            type="text"
            placeholder="Expectation period"
            className="w-full bg-gray-800 rounded p-2 mb-3"
            {...register("duration")}
          />
          <p className="text-red-500 text-xs">{errors.duration?.message}</p>
        </div>

        <div className="">
          <p className="">Stages</p>
          <select className="w-full bg-gray-800 rounded p-2 mb-3" {...register("stages")}>
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <p className="text-red-500 text-xs">{errors.stages?.message}</p>
        </div>
        <button className="w-full bg-[#641BE6] text-white rounded p-2 hover:bg-[#641BE6]0">
          Preview
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
