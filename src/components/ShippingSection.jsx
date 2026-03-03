import React, { useState } from 'react';

const ShippingSection = ({ onShippingSelect, originCep }) => {
  const [cep, setCep] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculateShipping = async (targetCep) => {
    setLoading(true);
    // Usando o Proxy para evitar erro de CORS em localhost
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate';

    try {
      const response = await fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiIyZDRlYjZjZjQzZmJhMGVhN2RmNzQ3NGRhY2NmYWVjZmYwNGY3OGJkZDdjNGZlN2RkYjU5NGQ2ZjYwMWRiNDgzY2JhOTg3Y2Q2Y2M1ZWY2NiIsImlhdCI6MTc3MjU0MDI2Ni41MzEzMDksIm5iZiI6MTc3MjU0MDI2Ni41MzEzMTIsImV4cCI6MTgwNDA3NjI2Ni41MjA5MzIsInN1YiI6ImExMzYyOGFiLTQ4ZmItNDYyNy1hM2Y5LWVjOTY4NDBiZTY0YSIsInNjb3BlcyI6WyJlY29tbWVyY2Utc2hpcHBpbmciLCJzaGlwcGluZy1wcmV2aWV3Iiwic2hpcHBpbmctZ2VuZXJhdGUiLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWNoZWNrb3V0Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsInNoaXBwaW5nLWNhbGN1bGF0ZSIsInNoaXBwaW5nLWNhbmNlbCJdfQ.F4BGZ0w5goNS5xw3eXqTnNGsTRcgiOqWgofkrFLC48cNz5G4RMWKTWmhmOo1RHXdXyuAgJGfmoeehMozF-EaRAd1qOiTU0BsCwlxhajOH3wk9KiNv65fCWODhJyj9wta_BL9T59XMmgCWcJvvnzAU-N1jh-Rb-VmhmKWpZbT6CaXGL0ysu1EvFKDsT6BKlcxzn4GY-xmlZjQzSKXQL6GACh3perUfL-fS1RfE6I83kyVz_KBpoUOPiAG_6yhuee1ABxh06Um-zj4tQ9ZoeAwPOxyJ9kfA_hubFTm3myk61t_We9DEfXjRpkSs96OeqUnnWiTxdAMLYgzVFETyJTAJAaF9ttW5nPeoGBxFkvyTWYMJWv2NFZFPTyg1SWRE7ALUwX1FtPGbEj5YzszL2rKQjKpr2rBfr8UDwFfyeqe4P7bXgsEWb7ZYUfyGlNBVzzhVnOS5xLf3r7luVBC6msPmm4NSlUxCZdHbZlZVbF31jiRV-GkCmx6hUQjpvcYjhfld3xT_0ZLxDAo80GpliI56KbOloiHeRCDYmbTSd6Qy0MC8ULiSPKIe-ShHxwHP2tP_GJJFBj5EtsllWNgV1zrx0YDOQVRG8MDgvkPowMEPlo0EDcLMO7lvT3A-dcscJEh7WhVcStwPiZ5eiF7NWvumVRCBJdtrl_0QYDxIY38MPw',
        },
        body: JSON.stringify({
          from: { postal_code: originCep },
          to: { postal_code: targetCep },
          products: [{ id: "p1", width: 15, height: 5, length: 20, weight: 0.5, quantity: 1 }]
        })
      });

      if (response.status === 403) {
        throw new Error('Acesse https://cors-anywhere.herokuapp.com/corsdemo e clique no botão para autorizar o proxy.');
      }

      if (!response.ok) throw new Error(`Erro API: ${response.status}`);

      const data = await response.json();
      setOptions(Array.isArray(data) ? data.filter(opt => !opt.error) : []);
    } catch (error) {
      console.error("Erro ao conectar:", error.message);
      alert(error.message); // Alerta para te avisar do botão do proxy
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCep(val);
    if (val.length === 8) calculateShipping(val);
  };

  return (
    <div className="space-y-4">
      <input 
        type="text"
        placeholder="Digite seu CEP para o frete"
        value={cep}
        onChange={handleCepChange}
        maxLength={8}
        className="w-full border border-gray-300 rounded-md p-3 bg-slate-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
      />

      {loading && <p className="text-purple-400 animate-pulse text-sm">Buscando opções de frete...</p>}

      <div className="grid gap-3">
        {options.map((opt) => (
          <label key={opt.id} className="border border-slate-700 rounded-lg p-4 flex justify-between items-center bg-slate-900 cursor-pointer hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-3">
              <input type="radio" name="ship" onChange={() => onShippingSelect(opt)} className="accent-emerald-500 w-4 h-4" />
              <div>
                <p className="font-bold text-sm text-white">{opt.company.name} ({opt.name})</p>
                <p className="text-xs text-slate-400">{opt.delivery_range.max} dias úteis</p>
              </div>
            </div>
            <span className="font-bold text-emerald-400 text-sm">R$ {parseFloat(opt.price).toFixed(2)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingSection;