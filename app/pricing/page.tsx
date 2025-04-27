import Plan from '@/components/Plan';

export default function Pricing() {
  return (
    <div className="grid grid-cols-3">
      <Plan name="BASIC" price={0} />
      <Plan name="PRO" price={9} features={['Brži odgovori', 'Više agenata']} />
      <Plan name="ULTRA" price={99} features={['Privatni agent', 'API pristup']} />
    </div>
  );
}