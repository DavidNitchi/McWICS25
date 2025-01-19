import Link from "next/link";

export default function NavButton(props:{ text : string , link : string, onClick?: () => void }) {
    return (
        <li className="hover:text-blue-500" onClick={props.onClick}>
            <Link href={props.link}>
                <p>{props.text}</p>
            </Link>
        </li>
    )
}