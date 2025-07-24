import React from "react";

export default function Impressum() {
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
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Impressum</h1>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Durgaville e.V.
        <br />
        Am Europakanal 2<br />
        91056 Erlangen
        <br />
        Germany
        <br />
        VR 201678
      </p>
      <h2>Vertreten durch:</h2>
      <p>Khalid Zubayr, Sarkar Dipankar, Zakaria Khabbab</p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: info@durgaville.com
        <br />
        Telefon: +49 160 3439029
      </p>
      <h2>Registereintrag</h2>
      <p>
        Eintragung im Vereinsregister.
        <br />
        Registergericht: Fürth
        <br />
        Registernummer: VR 201678
      </p>
      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>Khalid Zubayr, Sarkar Dipankar, Zakaria Khabbab, Anschrift wie oben</p>
      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
        Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
      </p>
      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
        Urheberrecht.
      </p>
      <p style={{ marginTop: 32, fontSize: "0.9em", color: "#888" }}>Letzte Aktualisierung: Juni 2024</p>
    </div>
  );
}
