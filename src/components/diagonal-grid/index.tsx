"use client"
import { useState } from "react";

const DiagonalGrid = () => {
  const size = 5;
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  const isDiagonal = (row: number, col: number) => {
    return hovered && (hovered.row === row || hovered.col === col || hovered.row - hovered.col === row - col || hovered.row + hovered.col === row + col);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 50px)`, gap: 5 }}>
      {Array.from({ length: size * size }, (_, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        const highlighted = isDiagonal(row, col);
        return (
          <div
            key={i}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: 50,
              height: 50,
              background: highlighted ? "#4ade80" : "#e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              border: "1px solid #ccc",
            }}
          >
            {row},{col}
          </div>
        );
      })}
    </div>
  );
};

export default DiagonalGrid;