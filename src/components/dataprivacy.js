import React from "react";

export default function DataPrivacy() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Datenschutzerklärung / Data Privacy Policy</h1>
      <h2>1. Verantwortliche Stelle</h2>
      <p>
        Durgaville e.V.
        <br />
        Am Europakanal 2<br />
        91056 Erlangen
        <br />
        Germany
        <br />
        E-Mail: info@durgaville.com
      </p>
      <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
      <p>
        Wir erheben und speichern Ihre personenbezogenen Daten (z.B. Name, E-Mail-Adresse, Telefonnummer), wenn Sie
        unser Kontaktformular nutzen oder sich für Veranstaltungen registrieren. Die Daten werden ausschließlich zur
        Bearbeitung Ihrer Anfrage oder Anmeldung verwendet.
      </p>
      <h2>3. Weitergabe von Daten</h2>
      <p>
        Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, es sei denn, dies ist gesetzlich vorgeschrieben oder zur
        Durchführung der Veranstaltung erforderlich.
      </p>
      <h2>4. Ihre Rechte</h2>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten bestehen</li>
        <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
      </ul>
      <h2>5. Kontakt</h2>
      <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an info@durgaville.com.</p>
      <h2>6. Änderungen</h2>
      <p>Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen.</p>
      <p style={{ marginTop: 32, fontSize: "0.9em", color: "#888" }}>Letzte Aktualisierung: Juni 2024</p>
    </div>
  );
}
