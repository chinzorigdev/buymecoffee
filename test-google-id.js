// Quick test to verify the Google ID fix in update-profile API
const testGoogleId = "110183887181866803313"; // The problematic Google ID from logs

console.log("Testing Google ID format:");
console.log("Length:", testGoogleId.length);
console.log("Is numeric:", /^\d+$/.test(testGoogleId));
console.log(
  "Is valid MongoDB ObjectId:",
  /^[0-9a-fA-F]{24}$/.test(testGoogleId)
);

// Test the ObjectId detection logic
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

if (isValidObjectId(testGoogleId)) {
  console.log("❌ Would try User.findById() - This would fail");
} else {
  console.log("✅ Would try User.findOne({ googleId }) - This should work");
}
