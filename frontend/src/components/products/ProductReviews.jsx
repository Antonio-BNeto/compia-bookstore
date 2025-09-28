// src/components/products/ProductReviews.jsx
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ProductReviews({ reviews }) {
  const [newReview, setNewReview] = useState("");
  const [allReviews, setAllReviews] = useState(reviews || []);

  const handleAddReview = () => {
    if (newReview.trim() === "") return;
    setAllReviews([...allReviews, { text: newReview, author: "Usuário Anônimo" }]);
    setNewReview("");
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Avaliações</h3>

      <div className="space-y-3 mt-4">
        {allReviews.length > 0 ? (
          allReviews.map((r, idx) => (
            <div key={idx} className="p-3 border rounded-lg bg-surface">
              <p className="text-sm">{r.text}</p>
              <span className="text-xs text-text-muted">- {r.author}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-muted">Nenhuma avaliação ainda.</p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Escreva sua avaliação..."
          className="flex-1 p-2 border rounded-lg bg-surface text-text"
        />
        <Button
          onClick={handleAddReview}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
