import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

function App() {
  interface Iuser {
    username: string;
    password: string;
  }

  const [users, setUsers] = useState<Iuser[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      const res: { data: { message: string } } = await axios.post(
        "http://localhost:3000/user",
        {
          username: (form.elements.namedItem("username") as HTMLInputElement)
            .value,
          password: (form.elements.namedItem("password") as HTMLInputElement)
            .value,
        }
      );

      console.log("Message : ", res.data.message);
      getAllUsers();
    } catch (error) {
      console.error("Can't get users : ", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res: { data: { users: Iuser[] } } = await axios.get(
        "http://localhost:3000/users"
      );
      setUsers(res.data.users);
    } catch (error) {
      console.error("Something went wrong! ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex justify-center w-screen h-3/12">
      <form
        className="flex flex-col my-5 border border-amber-600 p-5 rounded-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="username"
          name="username"
          placeholder="username"
          className="border border-gray-500 rounded-lg p-2 mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="border border-gray-500 rounded-lg p-2 mb-4"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-sky-500 rounded-lg text-white"
        >
          Add User
        </button>
      </form>
      <div className="my-4 border border-green-600 w-64 rounded-lg ms-2 overflow-auto max-h-52">
        <div className="text-center border-b border-gray-500">Users</div>
        <div className="flex flex-col items-center">
          {users?.map(({ username, password }: Iuser) => (
            <div className="flex border-b border-amber-600">
              <p className="my-2 pe-3">{username}</p>
              <p className="my-2">{password}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
