import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  const targetEmail = "hello@businesssortedkent.co.uk";
  
  console.log(`Looking for user with email: ${targetEmail}`);
  
  // List all users to find the ID corresponding to the target email
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error("Failed to fetch users:", listError.message);
    process.exit(1);
  }

  const user = usersData.users.find(u => u.email === targetEmail);

  if (!user) {
    console.error(`Status: Failed. User with email "${targetEmail}" was not found in Supabase Auth.`);
    process.exit(1);
  }

  console.log(`Found user ID: ${user.id}. Updating app_metadata...`);

  const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
    user.id,
    { app_metadata: { role: 'admin' } }
  );

  if (updateError) {
    console.error("Failed to update user:", updateError.message);
    process.exit(1);
  }

  console.log("Success! Updated user. New app_metadata:", updateData.user.app_metadata);
}

main();
