export default function ViewToggle({ view, onChange }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <button onClick={() => onChange('MASTER')} style={buttonStyle(view === 'MASTER')}>
                Master View
            </button>

            <button onClick={() => onChange('VENUE')} style={buttonStyle(view === 'VENUE')}>
                Venue View
            </button>
        </div>
    );
}

function buttonStyle(active) {
    return {
        padding: '8px 16px',
        borderRadius: 8,
        border: active ? '2px solid #2563eb' : '1px solid #cbd5e1',
        background: active ? '#eff6ff' : '#fff',
        cursor: 'pointer',
        fontWeight: 600,
    };
}

