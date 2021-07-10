import react, {
  useState,
  useRef,
  useEffect,
  useReducer,
  forwardRef,
} from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
const db = require("../../lib/postgresSetup");
import useUser from "../../lib/useUser";
import axios from "axios";

function SignupForm(props) {
  const [fullname, setFullname] = useState(props.fullname);
  const [phone, setPhone] = useState(props.phone);
  const [story, setStory] = useState(props.story);
  const [address, setAddress] = useState(props.address);
  const [question1, setQuestion1] = useState(props.question1);
  const [question2, setQuestion2] = useState(props.question2);
  const [question3, setQuestion3] = useState(props.question3);
  const [question4, setQuestion4] = useState(props.question4);
  const [question5, setQuestion5] = useState(props.question5);
  const [question6, setQuestion6] = useState(props.question6);
  const [question7, setQuestion7] = useState(props.question7);
  const [question8, setQuestion8] = useState(props.question8);
  const [question9, setQuestion9] = useState(props.question9);
  const [question10, setQuestion10] = useState(props.question10);

  async function save(message) {
    const potentialmember_uid = props.potentialmember_uid;
    const payload = {
      potentialmember_uid,
      fullname,
      phone,
      story,
      address,
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
      question9,
      question10,
    };
    const response = await axios.post(
      "/api/user/updatePotentialMember",
      payload
    );
    if (message) {
      alert(response.data);
    }
  }

  return (
    <div>
      <h1>Welcome to the Politically Active Christians application form</h1>
      <div style={{ margin: "25px" }}>
        <div>
          <p>What is your real first and lat name?</p>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          ></input>
        </div>
        <div>
          <p>
            How did you learn about Politically Active Christians and what
            individual(s) are recommending you join?
          </p>
          <TextareaAutosize
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>What is your phone number? (optional)</p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div>
          <p>What is your address? (optional)</p>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
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
          <TextareaAutosize
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b> Freedom </b> As the cornerstone of our republic, which we must
            defend with our lives, our fortunes, and our sacred honor
          </p>
          <TextareaAutosize
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b>The Constitution</b> Which must be implemented and interpreted as
            it was intended by the Founding Fathers
          </p>
          <TextareaAutosize
            value={question3}
            onChange={(e) => setQuestion3(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
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
          <TextareaAutosize
            value={question4}
            onChange={(e) => setQuestion4(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b>Individual Rights</b> In particular: freedom of speech, religion,
            and the right to bear arms, property, and the pursuit of happiness
          </p>
          <TextareaAutosize
            value={question5}
            onChange={(e) => setQuestion5(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b>Right to Life</b> Because life is sacred
          </p>
          <TextareaAutosize
            value={question6}
            onChange={(e) => setQuestion6(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b>Marriage</b> The union of one man and one woman
          </p>
          <TextareaAutosize
            value={question7}
            onChange={(e) => setQuestion7(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b> Personal Responsibility </b>Through self-governance and
            accepting our own success and failure
          </p>
          <TextareaAutosize
            value={question8}
            onChange={(e) => setQuestion8(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b> Fiscal Responsibility</b> By the government adhering to low
            taxation, maintaining a balanced budget, and opposing pork barrel
            spending
          </p>
          <TextareaAutosize
            value={question9}
            onChange={(e) => setQuestion9(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
        <div>
          <p>
            <b>(No supremacist Ideologies)</b> I am not a mason or member of a
            secret society intent on taking over the world. I am also not a
            white supremacist.
          </p>
          <TextareaAutosize
            value={question10}
            onChange={(e) => setQuestion10(e.target.value)}
            rowsMin={2}
          ></TextareaAutosize>
        </div>
      </div>
      <button onClick={(e) => save(true)}>Save</button>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const uid = ctx.params.uuid;
  const email = ctx.query.email;
  try {
    let text = `select potentialmember_uid, email, fullname, phone, address, story, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12 from potentialmembers where email = $1 AND potentialmember_uid=$2`;
    let values = [email, uid];
    const dbResponse = await db.query(text, values);
    if (dbResponse.rows.length == 0) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    return { props: { ...dbResponse.rows[0] } };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

export default SignupForm;
