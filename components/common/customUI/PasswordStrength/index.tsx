import zxcvbn from 'zxcvbn';

import { passwordLevel, mapZxcvbnScore } from './helpers';

type Props = {
  password: string,
};

export const PasswordStrength = ({ password }: Props) => {
  const hasValue = password.length > 0;

  const { score } = hasValue ? zxcvbn(password) : { score: -1 };
  const mappedScore = hasValue ? mapZxcvbnScore(score) : 0;
  const level = passwordLevel[mappedScore as keyof typeof passwordLevel];

  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 999,
              background: i < mappedScore ? level.color : "#e5e7eb",
              transition: "background .25s ease",
            }}
          />
        ))}
      </div>
      
      {hasValue && (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            fontWeight: 500,
            color: level.color,
          }}
        >
          {level.label}
        </div>
      )}
    </div>
  );
};
