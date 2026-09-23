import type { JunjiCardId } from "../../data/junji-cards";
import "../../styles/junji-verb-art.css";

type Props = {
  id: JunjiCardId;
};

export default function VerbCardArt({ id }: Props) {
  return (
    <span className={`verb-art verb-art--${id}`} aria-hidden="true">
      <img
        src={`/junji-cards/junji-${id}.webp`}
        alt=""
        width="768"
        height="512"
        loading="lazy"
        decoding="async"
      />
      <span className="verb-art__light"></span>
      <span className="verb-art__shade"></span>
    </span>
  );
}
