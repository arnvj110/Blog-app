
import MDEditor from "@uiw/react-md-editor";


export default function MarkDownEditor() {
  const [value, setValue] = useState("");

  return (
    <div className="container" data-color-mode="dark">
      <MDEditor value={value} onChange={setValue} />
    </div>
  );
}
