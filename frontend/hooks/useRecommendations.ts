"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { executeRecommendation } from "@/lib/api";

import recommendationService, {
  Recommendation,
} from "@/services/recommendation";

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
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

      const data = await recommendationService.getRecommendations(merchantId);

      setRecommendations(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      await loadRecommendations();
    }

    void init();
  }, []);

  async function approve(id: string) {
    try {
      setProcessingId(id);

      await recommendationService.approveRecommendation(id);

      toast.success("Recommendation approved");

      await loadRecommendations();
    } catch {
      toast.error("Failed to approve recommendation");
    } finally {
      setProcessingId(null);
    }
  }

  async function reject(id: string) {
    try {
      setProcessingId(id);

      await recommendationService.rejectRecommendation(id);

      toast.success("Recommendation rejected");

      await loadRecommendations();
    } catch {
      toast.error("Failed to reject recommendation");
    } finally {
      setProcessingId(null);
    }
  }

  async function execute(id: string) {
    try {
      setProcessingId(id);

      await executeRecommendation(id);

      toast.success("Recommendation executed successfully");

      await loadRecommendations();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail ?? "Execution failed");
      } else {
        toast.error("Execution failed");
      }
    }
  }

  return {
    recommendations,
    loading,
    error,
    refresh: loadRecommendations,
    approve,
    reject,
    execute,
    processingId,
  };
}
