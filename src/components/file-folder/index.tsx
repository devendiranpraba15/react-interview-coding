"use client";
import React, { useState } from "react";

type FileType = {
  name: string;
  isFolder: boolean;
  node?: FileType[];
};

type FileItemProps = {
  node: FileType;
};

const sampleFile: FileType = {
  name: "src",
  isFolder: true,
  node: [
    {
      name: "components",
      isFolder: true,
      node: [
        {
          name: "file.tsx",
          isFolder: false,
        },
      ],
    },
    {
      name: "hooks",
      isFolder: false,
      node: [
        {
          name: "useHook.tsx",
          isFolder: false,
        },
      ],
    },
  ],
};

function FileItem({ node }: FileItemProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    if (node.isFolder) {
      setOpen(!open);
    }
  };

  console.log(node);
  return (
    <>
      <li>
        <div
          onClick={handleToggle}
          style={{ cursor: node.isFolder ? "pointer" : "default" }}
        >
          {node.isFolder ? "📁" : "📄"} {node.name}
        </div>
        {open && node.node && (
          <ul style={{ paddingLeft: 20 }}>
            {node.node.map((child, idx) => (
              <FileItem key={idx} node={child} />
            ))}
          </ul>
        )}
      </li>
    </>
  );
}

const FileFolder = () => (
  <div>
    <h3>File Explorer</h3>
    <ul>
      <FileItem node={sampleFile} />
    </ul>
  </div>
);

export default FileFolder;
