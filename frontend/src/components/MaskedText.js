import React from 'react';
import classNames from 'classnames';
import "./MaskedText.css"

const entityStyles = {
  AGE: { backgroundColor: "#e0f2fe", color: "#0284c7" }, // Mavi tonları
  CITY: { backgroundColor: "#d1fae5", color: "#065f46" }, // Yeşil tonları
  COUNTRY: { backgroundColor: "#f0f9ff", color: "#1e3a8a" }, // Mavi tonları
  DATE: { backgroundColor: "#cce4f6", color: "#1e3a8a" }, // Mavi tonları
  DOCTOR: { backgroundColor: "#fbcfe8", color: "#9d174d" }, // Pembe tonları
  EMAIL: { backgroundColor: "#eef2f7", color: "#4b5563" }, // Gri tonları
  HOSPITAL: { backgroundColor: "#d1fae5", color: "#065f46" }, // Yeşil tonları
  IDNUM: { backgroundColor: "#f3e8ff", color: "#6b21a8" }, // Mor tonları
  ORGANIZATION: { backgroundColor: "#f3e4d4", color: "#9c1d1d" }, // Krem tonları
  PATIENT: { backgroundColor: "#f9a8d4", color: "#9b1d4d" }, // Pembe tonları
  PHONE: { backgroundColor: "#fef3c7", color: "#b45309" }, // Sarı tonları
  PROFESSION: { backgroundColor: "#c7d2fe", color: "#4f46e5" }, // Mor tonları
  SSN: { backgroundColor: "#e2e8f0", color: "#1e40af" }, // Mavi tonları
  STREET: { backgroundColor: "#f9fafb", color: "#374151" }, // Gri tonları
  ZIP: { backgroundColor: "#f3f4f6", color: "#111827" }, // Gri tonları
  ACCOUNT: { backgroundColor: "#fef2f2", color: "#b91c1c" }, // Kırmızı tonları
  DLN: { backgroundColor: "#fdf2e9", color: "#7c3aed" }, // Mor tonları
  IP: { backgroundColor: "#f9fafb", color: "#4b5563" }, // Gri tonları
  FAX: { backgroundColor: "#e0f2f1", color: "#006d6d" }, // Turkuaz tonları
  LICENCE: { backgroundColor: "#e5e7eb", color: "#4b5563" }, // Gri tonları
  PLATE: { backgroundColor: "#fef2f2", color: "#b91c1c" }, // Kırmızı tonları
  URL: { backgroundColor: "#f0f4f8", color: "#1e40af" }, // Mavi tonları
  VIN: { backgroundColor: "#e9d5ff", color: "#6b21a8" },
  Drug: { backgroundColor: "#cffafe", color: "#0e7490" }, // Açık camgöbeği
  ADE: { backgroundColor: "#fee2e2", color: "#b91c1c" }, // Açık kırmızı
  Reason: { backgroundColor: "#fef9c3", color: "#92400e" }, // Sarı tonları
  Duration: { backgroundColor: "#ddd6fe", color: "#5b21b6" }, // Lila
  Form: { backgroundColor: "#dcfce7", color: "#166534" }, // Açık yeşil
  Route: { backgroundColor: "#e0f2fe", color: "#0369a1" }, // Mavi tonları
  Strength: { backgroundColor: "#fce7f3", color: "#be185d" }, // Pembe tonları
  Dosage: { backgroundColor: "#ede9fe", color: "#7c3aed" }, // Mor tonları
  Frequency: { backgroundColor: "#fae8ff", color: "#9d174d" }, // Fuşya benzeri          // Mor tonları
};

const MaskedText = ({ parsedData }) => {
  return (
    <div className="flex flex-wrap gap-1 mt-4 text-base leading-relaxed">
      {parsedData.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index} style={{
              textAlign: "justify", // Metni justify yapıyoruz
              lineHeight: '40px',
            }}>{part.value}</span>;
        }

        // Burada entity label'ına göre renkleri alıyoruz
        const style = entityStyles[part.label] || { backgroundColor: '#e5e5e5', color: '#333' , }; // Varsayılan gri renk

        return (
          <span
            key={index}
            style={{
              ...style,
              lineHeight: '40px',
              padding: '4px 8px',
              borderRadius: '4px',
              fontWeight: '600',
              marginRight: '8px', // Text ve label arasına boşluk eklemek için
              textAlign: "justify", // Metni justify yapıyoruz
            }}
          >
            {part.value}
            <span
              style={{
                fontSize: '12px',
                color: '#6b7280',
                marginLeft: '4px', 
                textAlign: "justify", // Label'ı da justify hizalayabiliriz
              }}
            >
              ({part.label})
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default MaskedText;

