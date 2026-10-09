import React from 'react';

const routineData = [
  {
    day: "Saturday",
    classes: [
      { time: "08:30 AM - 10:00 AM", code: "GE324", title: "Business Analysis & Communication", room: "712A", teacher: "SK", lab: "" },
      { time: "10:00 AM - 11:30 AM", code: "GE324", title: "Business Analysis & Communication", room: "712A", teacher: "SK", lab: "" },
    ]
  },
  {
    day: "Sunday",
    classes: [
      { time: "02:30 PM - 04:00 PM", code: "SE225", title: "Data Communication & Computer Networks", room: "1018A", teacher: "AMR", lab: "" },
      { time: "04:00 PM - 05:30 PM", code: "SE312", title: "Software Quality Assurance and Testing", room: "701B", teacher: "AGA", lab: "" },
    ]
  },
  {
    day: "Monday",
    classes: [
      { time: "01:00 PM - 02:30 PM", code: "SE311", title: "Design Pattern", room: "Annexe-308", teacher: "NML", lab: "" },
      { time: "04:00 PM - 05:30 PM", code: "Lab C1: SE312 (SNM) Room: AB3-108 / Lab C2: SE226 (AMR) Room: 405 (Lab)", title: "Lab Classes", room: "Lab / AB3-108", teacher: "SNM / AMR", lab: "Lab" },
    ]
  },
  {
    day: "Tuesday",
    classes: []
  },
  {
    day: "Wednesday",
    classes: [
      { time: "11:30 AM - 01:00 PM", code: "SE313", title: "Software Quality Assurance (Lab C2)", room: "AB3-108", teacher: "SNM", lab: "Lab C2" },
      { time: "02:30 PM - 04:00 PM", code: "SE226", title: "Data Communication Lab (Lab C1)", room: "710", teacher: "AMR", lab: "Lab C1" },
      { time: "04:00 PM - 05:30 PM", code: "SE312", title: "Software Quality Assurance", room: "712A", teacher: "AGA", lab: "" },
    ]
  },
  {
    day: "Thursday",
    classes: [
      { time: "01:00 PM - 02:30 PM", code: "SE311", title: "Design Pattern", room: "1018A", teacher: "NML", lab: "" },
      { time: "02:30 PM - 04:00 PM", code: "SE225", title: "Data Communication & Computer Networks", room: "1018A", teacher: "AMR", lab: "" },
    ]
  },
  {
    day: "Friday",
    classes: []
  }
];

export default function Routine() {
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px', background: '#0284c7', padding: '15px', borderRadius: '12px' }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>Department of Software Engineering</h2>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>Batch: 43 | Section: C</p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {routineData.map((item, index) => (
          <div key={index} style={{
            background: '#1e293b',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #334155'
          }}>
            <h3 style={{ color: '#38bdf8', margin: '0 0 12px 0', fontSize: '18px', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
              {item.day}
            </h3>

            {item.classes.length === 0 ? (
              <p style={{ color: '#64748b', fontStyle: 'italic', margin: 0, fontSize: '14px' }}>No classes scheduled / Off day</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {item.classes.map((cls, cIdx) => (
                  <div key={cIdx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#0f172a',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    flexWrap: 'wrap',
                    gap: '10px',
                    borderLeft: cls.lab ? '4px solid #a855f7' : '4px solid #0284c7'
                  }}>
                    <div>
                      <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#f8fafc', marginRight: '8px' }}>
                        {cls.code}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '15px' }}>{cls.title}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#cbd5e1', flexWrap: 'wrap' }}>
                      <span>🕒 {cls.time}</span>
                      <span>📍 Room: {cls.room}</span>
                      <span>👨‍🏫 {cls.teacher}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}