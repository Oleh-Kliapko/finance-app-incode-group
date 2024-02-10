import { useEffect } from "react";
import { socket } from "@/config";

import { IQuote } from "@/interfaces";

export const useGetTickers = (cb: (quotes: IQuote[]) => void) => {
  useEffect(() => {
    socket.on("ticker", (quotes) => {
      cb(quotes);
    });

    socket.emit("start");

    return () => {
      socket.off("ticker");
    };
  }, [cb]);
};
