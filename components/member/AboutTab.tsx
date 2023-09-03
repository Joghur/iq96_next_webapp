import { motion } from 'framer-motion';

import packageJson from '../../package.json';

const aboutList = [
  [
    '0.7.0',
    'Kortet: Kortet starter igen på den første markør lavet i byen. Mere finpudsning',
  ],
  [
    '0.6.9',
    'Kortet: Det er muligt at se alle byer og oprette nye markører, efter man har valgt en by. Dette gøres ved at dobbeltklikke. Mangler stadig lidt finpudsning ',
  ],
  [
    '0.6.8',
    'Farve temaer er skåret ned til to indtil videre og de  to skulle være respekteret rundt omkring på siderne',
  ],
  ['0.6.7', 'T-shirt størrelse kan skiftes af brugere'],
  ['0.6.6', "Med-lems data kan ses under IQ96 -> Med-lem's navn & IQ96"],
  [
    '0.6.5',
    'Vores foreningskonto kontakter kan nu hentes (indtil videre kun af admin)',
  ],
  ['0.6.4', 'GDPR'],
  [
    '0.6.3',
    'Kortet virker nogenlunde som før. Listen af steder er nu ordnet så det er lettere at finde IQ96 begivenheder. Animationer',
  ],
  ['0.6.2', 'Omstrukturer hele siden og flytter den til app.iq96.dk'],
  [
    '0.4.4',
    'Forbedret login oplevelse (mindre flimren) - check for om lokation er sat til',
  ],
];

const AboutTab = () => {
  return (
    <div className="px-10">
      <div className="dynamic_text mb-3">
        <strong>{`IQ96 web app v${packageJson.version}`}</strong>
      </div>
      {aboutList.map((o, index) => (
        <div key={index} className="dynamic_text flex flex-row gap-2">
          {index === 0 && (
            <motion.div
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
              }}
            >
              {o?.[0]}
            </motion.div>
          )}
          {index !== 0 && <div>{o?.[0]}</div>}
          <div>{`-`}</div>
          <div>{o?.[1]}</div>
        </div>
      ))}
    </div>
  );
};

export default AboutTab;
