import db from './postgresSetup'

async function buildJob(notes,user) {
  const text = `INSERT INTO JOBS (user_uid,notes) VALUES($1,$2) RETURNING *`;
  const values = [user.user_uid,notes];
  const jobQuery = await db.query(text,values);
  const jobUid = jobQuery.rows[0].jobs_uid;
        return jobUid;
      }

export default buildJob;
