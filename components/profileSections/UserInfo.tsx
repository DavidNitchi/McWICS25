import { Dispatch, SetStateAction } from "react";

interface UserInfoProps {
  userInfo: {
    name: string;
    email: string;
    password: string;
    // Add more fields here as neede
  };
}

export default function UserInfo(props: UserInfoProps) {
  return (
    <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow h-2/3 w-full">
      <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
      <p>
        <strong>Name:</strong> {props.userInfo.name}
      </p>
      <p>
        <strong>Email:</strong> {props.userInfo.email}
      </p>
      {/* TODO add more info later */}

      {/* <button
        onClick={() => props.modal(["userInfo", ""])}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit Information
      </button> */}
    </section>
  );
}
