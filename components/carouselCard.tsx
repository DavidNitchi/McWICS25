import Link from "next/link";

export default function CarouselCard(props: {
  title?: string;
  link?: string;
  description?: string;
}) {
  return (
    <Link href={props.link ?? "#"} className="flex flex-col items-center overflow-clip">
      <div className="font-semibold text-xl line-clamp-2 font-mono">{props.title ?? "This is an Empty Card"}</div>
      <div className="w-4/5 border-b shadow"></div>
      <div className="text-sm break-words line-clamp-4 font-mono">
        {props.description ??
          "This is the empy card's description and this is more of the description and this is even more of the description and so on. THis is some more and this is some more more and more and again plz help what the sigma"}
      </div>
    </Link>
  );
}
