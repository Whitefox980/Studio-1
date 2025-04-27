export function HeroDemo() {
  return (
    <div className="relative">
      <video autoPlay loop muted playsInline>
        <source src="/demo.mp4" type="video/mp4" />
      </video>
      <CTAButton>Probajte Besplatno</CTAButton>
    </div>
  );
}