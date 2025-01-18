import Link from "next/link";

export default function NavButton(props:{ text : string , link : string }) {
    return (
        <li className="hover:text-blue-500">
            <Link href={props.link}>
                <p>{props.text}</p>
            </Link>
        </li>
    )
}