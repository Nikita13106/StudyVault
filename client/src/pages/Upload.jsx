import UploadForm from "../components/UploadForm.jsx";

export default function Upload({ onUpload }) {
  return (
    <div>
      <UploadForm onUpload={onUpload} />
    </div>
  );
}
