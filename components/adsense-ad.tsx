"use client";

import React from "react";

type AdSenseAdProps = {
    className?: string;
    slot?: string;
};

export default function AdSenseAd({
    className = "w-full mb-8 overflow-hidden",
    slot = "3744772454"
}: AdSenseAdProps) {
    return (
        <div className={className}>
            <div
                dangerouslySetInnerHTML={{
                    __html: `
          <!-- selfhost-hub-horizon -->
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-7296634171837358"
               data-ad-slot="${slot}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
          `,
                }}
            />
        </div>
    );
} 