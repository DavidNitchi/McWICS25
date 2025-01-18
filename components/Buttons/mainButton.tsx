import Link from "next/link";

export default function MainButton(props: { text: string; link: string }) {
    return (
      <li className="hover:text-white text-lg font-medium flex items-center justify-center h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl w-9/12 m-1">
        <Link href={props.link}>
            <h1> {props.text} </h1>
        </Link>
      </li>
    );
}

  