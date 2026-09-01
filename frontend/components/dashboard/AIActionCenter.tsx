"use client";

import {
  RefreshCcw,
  Sparkles,
  Inbox,
} from "lucide-react";

import {
    executeRecommendation,
} from "@/lib/api";

import { Button } from "@/components/ui/button";

import RecommendationCard from "./RecommendationCard";

import {
  useRecommendations,
} from "@/hooks/useRecommendations";

export default function AIActionCenter() {

  const {
    recommendations,
    loading,
    error,
    refresh,
    approve,
    reject,
    execute,
} = useRecommendations();

  return (

    <section className="rounded-xl border bg-card p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-primary/10 p-2">

            <Sparkles className="h-5 w-5 text-primary" />

          </div>

          <div>

            <h2 className="text-lg font-semibold">

              AI Action Center

            </h2>

            <p className="text-sm text-muted-foreground">

              AI-generated recommendations ready for approval.

            </p>

          </div>

        </div>

        <Button
          variant="outline"
          onClick={refresh}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />

          Refresh

        </Button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="space-y-4">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="h-36 animate-pulse rounded-xl bg-muted"
            />

          ))}

        </div>

      )}

      {/* Error */}

      {!loading && error && (

        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">

          <p className="font-medium text-destructive">

            Failed to load recommendations.

          </p>

        </div>

      )}

      {/* Empty */}

      {!loading &&
        !error &&
        recommendations.length === 0 && (

          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12">

            <Inbox className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="text-lg font-semibold">

              No Recommendations

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Your AI currently has nothing to recommend.

            </p>

          </div>

        )}

      {/* Cards */}

      {!loading &&
        !error &&
        recommendations.length > 0 && (

          <div className="space-y-4">

            {recommendations.map((recommendation) => (

              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                onApprove={approve}
                onReject={reject}
                onExecute={execute}
              />

            ))}

          </div>

        )}

    </section>

  );
}