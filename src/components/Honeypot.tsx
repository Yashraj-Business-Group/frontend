import React from 'react';

/**
 * Hidden field that only bots fill in. Real users never see or interact with
 * it (positioned off-screen, not display:none — some bots skip those), so
 * a non-empty value on submit means the request should be silently dropped.
 */
const Honeypot = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
    <label htmlFor="website">Website</label>
    <input
      type="text"
      id="website"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Honeypot;
