export default function DropdownButton(props: { toggleSection: () => void, toggleDropdown: () => void, text: string }) {
    return (
        <button className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full " onClick={() => { props.toggleSection(); props.toggleDropdown(); }}>{props.text}</button>
    )
}