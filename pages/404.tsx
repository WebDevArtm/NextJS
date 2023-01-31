import Link from "next/link";
import Next from "../public/next.svg";

export default function ErrorPage() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{width: '400px', marginBottom: '60px'}}>
        <Next />
      </div>
      <h1>Error 404</h1>
      <p>
        Please <Link href={"/"}>go back</Link> to safety
      </p>
    </div>
  );
}
