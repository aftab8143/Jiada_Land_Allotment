import { useRef, useState } from 'react';

const FileUpload = ({ accept, multiple, onChange, label = 'Drop files here or click to upload', hint }) => {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (newFiles) => {
    const list = multiple ? [...files, ...Array.from(newFiles)] : Array.from(newFiles);
    setFiles(list);
    onChange?.(list);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const remove = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onChange?.(updated);
  };

  return (
    <div>
      <div
        className={[
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-[border-color,background] duration-200',
          dragging
            ? 'border-primary bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-primary hover:bg-blue-50',
        ].join(' ')}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="text-[2rem] mb-2">📂</div>
        <div className="text-sm text-gray-700 mb-1">{label}</div>
        {hint && <div className="text-xs text-gray-400">{hint}</div>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <div className="mt-3 flex flex-col gap-1">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-100 rounded px-3 py-1.5 text-xs">
              <span>📄 {f.name}</span>
              <button
                className="bg-none border-none cursor-pointer text-gray-400 text-base leading-none hover:text-red-500"
                onClick={() => remove(i)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
