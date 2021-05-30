import React, { useEffect, useState } from "react";
import { BigPlayButton, LoadingSpinner, Player } from "video-react";
import { getFile } from "../helpers/stroage";

export default function VideoPlayer({ videoUrl }) {
  const [url, setUrl] = useState(null);
  useEffect(async () => {
    if (!url && videoUrl) {
      const singed = await getFile(videoUrl);

      setUrl(singed);
    }
  }, [url]);

  return url ? (
    <Player src={url}>
      <LoadingSpinner />
      <BigPlayButton position="center" />
    </Player>
  ) : (
    <div></div>
  );
}
