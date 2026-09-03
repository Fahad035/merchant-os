"use client";

import { useEffect, useState } from "react";

import recommendationService, {
  Recommendation,
} from "@/services/recommendation";

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadRecommendations() {
    try {
      setLoading(true);
      setError(false);

      const merchantId = localStorage.getItem("merchant_id");

      if (!merchantId) {
        setRecommendations([]);
        return;
      }

      const data =
        await recommendationService.getRecommendations(
          merchantId
        );

      setRecommendations(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadRecommendations();
  }, []);

  async function approve(id: string) {
    await recommendationService.approveRecommendation(id);
    await loadRecommendations();
  }

  async function reject(id: string) {
    await recommendationService.rejectRecommendation(id);
    await loadRecommendations();
  }

  async function execute(id: string) {
    await recommendationService.executeRecommendation(id);
    await loadRecommendations();
  }

  return {
    recommendations,
    loading,
    error,
    refresh: loadRecommendations,
    approve,
    reject,
    execute,
  };
}