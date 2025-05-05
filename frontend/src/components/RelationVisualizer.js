import React from "react";

// Metin parçasını renklendirme fonksiyonu
const highlightText = (sentence, startIdx, endIdx, color) => {
  if (typeof sentence !== "string") {
    console.error("Sentence should be a string, but got:", typeof sentence);
    return sentence;
  }

  const before = sentence.substring(0, startIdx);
  const highlight = sentence.substring(startIdx, endIdx + 1);
  const after = sentence.substring(endIdx + 1);

  return (
    <>
      {before}
      <mark style={{ backgroundColor: color }}>{highlight}</mark>
      {after}
    </>
  );
};

// Ok çizim fonksiyonu
const Arrow = ({ startX, startY, endX, endY }) => {
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const length = Math.sqrt(dx * dx + dy * dy);

  const arrowStyle = {
    position: "absolute",
    left: `${startX}px`,
    top: `${startY}px`,
    width: `${length}px`,
    height: "2px",
    backgroundColor: "black",
    transform: `rotate(${angle}deg)`,
    transformOrigin: "0 0",
    zIndex: 1,
  };

  const arrowHeadStyle = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "black",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    top: "-5px",
    left: `${length - 10}px`,
    transform: `rotate(${angle}deg)`,
  };

  return (
    <div style={{ position: "absolute" }}>
      <div style={arrowStyle} />
      <div style={arrowHeadStyle} />
    </div>
  );
};

const RelationVisualizer = ({ output }) => {
  return (
    <div style={{ position: "relative", fontFamily: "Arial, sans-serif" }}>
      {output && output.length > 0 ? (
        output.map((item, index) => {
          const chunk1Start = item.sent_begin1;
          const chunk1End = item.sent_end1;
          const chunk2Start = item.sent_begin2;
          const chunk2End = item.sent_end2;

          // Cümleyi yerleştirme
          const sentence = item.sentence;

          // Chunk'ların konumlarını hesaplamak için ölçeklendirme (bu basit bir yöntem, özelleştirilebilir)
          const chunk1Position = chunk1Start * 8; // Metin uzunluğu oranında
          const chunk2Position = chunk2Start * 8;

          const chunkHeight = 40; // Chunk'ları yerleştirmek için yüksekliği belirleyelim

          return (
            <div key={index} style={{ marginBottom: "40px", position: "relative" }}>
              {/* Cümle metni */}
              <p style={{ margin: 0 }}>
                {highlightText(sentence, chunk1Start, chunk1End, "yellow")}
                {highlightText(sentence, chunk2Start, chunk2End, "lightblue")}
              </p>

              {/* Ok çizimi: Chunk1'den Chunk2'ye */}
              <Arrow
                startX={chunk1Position}
                startY={chunkHeight}
                endX={chunk2Position}
                endY={chunkHeight}
              />

              {/* Label'ı okların üstüne yazma */}
              <div
                style={{
                  position: "absolute",
                  left: (chunk1Position + chunk2Position) / 2 + "px",
                  top: chunkHeight - 25 + "px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "black",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })
      ) : (
        <p>No relations available.</p>
      )}
    </div>
  );
};

export default RelationVisualizer;
