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
      isFolder: true,
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
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [children, setChildren] = useState<FileType[]>(node.node ?? []);

  const handleToggle = () => {
    if (node.isFolder) {
      setOpen(!open);
    }
  };

  const handleClickContext = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const addFileFolder = (type: "Folder" | "File") => {
    const value = prompt(`Enter ${type} name:`);
    if (!value) return;

    const result = {
      name: value,
      isFolder: type === "Folder",
      node: type === "Folder" ? [] : undefined,
    };

    setChildren((prev) => [...prev, result]);
    setContextMenu(null);
  };

  return (
    <>
      <li>
        <div
          onClick={handleToggle}
          onContextMenu={node.isFolder ? handleClickContext : undefined}
          style={{ cursor: node.isFolder ? "pointer" : "default" }}
        >
          {node.isFolder ? "📁" : "📄"} {node.name}
        </div>
        {contextMenu && (
          <div
            style={{
              position: "absolute",
              top: contextMenu.y,
              left: contextMenu.x,
              background: "white",
              border: "1px solid black",
              padding: "5px",
              zIndex: 1000,
            }}
            onClick={() => setContextMenu(null)}
          >
            <div onClick={() => addFileFolder("Folder")}>Folder</div>
            <div onClick={() => addFileFolder("File")}>File</div>
          </div>
        )}

        {open && children && (
          <ul style={{ paddingLeft: 20 }}>
            {children.map((child, idx) => (
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
