export const exportToJson = (data, filename = "output.json") => {
    const fullData = {
      timestamp: new Date().toISOString(),
      ...data,  // data bir nesne ise tüm içeriğini dahil eder
    };
  
    const blob = new Blob([JSON.stringify(fullData, null, 2)], {
      type: "application/json",
    });
  
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  