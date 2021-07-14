import React from "react";

function ReadQuestions(props) {
  return (
    <div>
      <div>
        <p>What is your real first and lat name?</p>
        <div style={{ border: "solid black 1px" }}>{props.member.fullname}</div>
      </div>
      <div>
        <p>
          How did you learn about Politically Active Christians and what
          individual(s) are recommending you join?
        </p>
        <div style={{ border: "solid black 1px" }}>{props.member.story}</div>
      </div>
      <div>
        <p>What is your phone number? (optional)</p>
        <div style={{ border: "solid black 1px" }}>{props.member.phone}</div>
      </div>
      <div>
        <p>What is your address? (optional)</p>
        <div style={{ border: "solid black 1px" }}>{props.member.address}</div>
      </div>
      <div style={{ marginTop: "50px" }}>
        <p>
          The following statements make up our core values. Please explain if
          you agree or not to each value. Typing "agree" in the text box is
          acceptable as well as giving your own answer
        </p>
      </div>
      <div>
        <p>
          <b>
            Triune God-The Father, His only Son Jesus Christ, and Holy Spirit;
            as described in the Holy Bible
          </b>
          :
        </p>
        <p>
          And that the United States of America was founded on principles
          endowed by our creator
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question1}
        </div>
      </div>
      <div>
        <p>
          <b> Freedom </b> As the cornerstone of our republic, which we must
          defend with our lives, our fortunes, and our sacred honor
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question2}
        </div>
      </div>
      <div>
        <p>
          <b>The Constitution</b> Which must be implemented and interpreted as
          it was intended by the Founding Fathers
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question3}
        </div>
      </div>
      <div>
        <p>
          <b> States Rights </b>As protection against tyranny of a federal
          government
        </p>
        <p>
          <b> Justice</b> Evenly administered under the Constitution and the
          Bill of Rights, free of Judiciary Activism
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question4}
        </div>
      </div>
      <div>
        <p>
          <b>Individual Rights</b> In particular: freedom of speech, religion,
          and the right to bear arms, property, and the pursuit of happiness
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question5}
        </div>
      </div>
      <div>
        <p>
          <b>Right to Life</b> Because life is sacred
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question6}
        </div>
      </div>
      <div>
        <p>
          <b>Marriage</b> The union of one man and one woman
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question7}
        </div>
      </div>
      <div>
        <p>
          <b> Personal Responsibility </b>Through self-governance and accepting
          our own success and failure
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question8}
        </div>
      </div>
      <div>
        <p>
          <b> Fiscal Responsibility</b> By the government adhering to low
          taxation, maintaining a balanced budget, and opposing pork barrel
          spending
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question9}
        </div>
      </div>
      <div>
        <p>
          <b>(No supremacist Ideologies)</b> I am not a mason or member of a
          secret society intent on taking over the world. I am also not a white
          supremacist.
        </p>
        <div style={{ border: "solid black 1px" }}>
          {props.member.question10}
        </div>
      </div>
    </div>
  );
}

export default ReadQuestions;
