type Props = {
  stage: "soil" | "discuss" | "plant" | "grow" | "harvest" | "care";
  eyebrow: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
};

export default function HarvestScene({ stage, eyebrow, title, src, alt, caption }: Props) {
  return (
    <figure className="harvest-scene" data-stage={stage}>
      <div className="harvest-scene__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={768}
          height={512}
          loading={stage === "soil" ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="harvest-scene__light" aria-hidden="true" />
        <span className="harvest-scene__shade" aria-hidden="true" />
        <span className="harvest-scene__corners" aria-hidden="true" />
      </div>
      <figcaption>
        <span className="harvest-scene__stage">{eyebrow}</span>
        <strong>{title}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
