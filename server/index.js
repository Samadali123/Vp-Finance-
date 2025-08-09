require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
app.use(cors());
// ---------Routes----------
// const adminRoute = require("./Routes/adminRoute");
const LeadSourceRoute = require("./Routes/Lead/LeadSourceRoute");
const LeadOccupationRoute = require("./Routes/Lead/LeadOccupationRoute");
const LeadAreaRoute = require("./Routes/Lead/LeadAreaRoute");
const LeadSubAreaRoute = require("./Routes/Lead/LeadSubAreaRoute");
const LeadCityRoute = require("./Routes/Lead/CityRoute");
const TaskRoute = require("./Routes/TaskRoute");
const FinancialProductRoute = require("./Routes/FinancialProductRoute");
const CompanyNameRoute = require("./Routes/CompanyNameRoute");
const SuspectRoute = require("./Routes/SuspectRoute");
const ProspectRoute = require("./Routes/ProspectRoute");
const RegistrarRoute = require("./Routes/RegistrarRoute");
const AMCRoute = require("./Routes/AMCRoute");
const LeadTypeRoute = require("./Routes/LeadTypeRoute");
const OccupationTypeRoute = require("./Routes/OccupationTypeRoute");
const OfficeDiaryRoute = require("./Routes/OfficeDiaryRoute");
const OfficePurchaseRoute = require("./Routes/OfficePurchaseRoute");
const ImpDocumentRoute = require("./Routes/ImpDocumentRoute");
const CLientRoute = require("./Routes/ClientRoute");
const morgan = require("morgan");
const cors = require("cors");

// ---------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
mongoose
  .connect(process.env.dbUrl)
  .then(() => console.log(" DB connected"))
  .catch((err) => console.error(" DB Connection Error:", err));

// ---------Routes----------

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, 'dist')));


// cors for cross origins 
app.use(cors());

// Add this catch-all route at the END of your routes (after all API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use("/api", require("./Routes/upload"));
app.use("/api/leadSource", LeadSourceRoute);
app.use("/api/leadOccupation", LeadOccupationRoute);
app.use("/api/leadarea", LeadAreaRoute);
app.use("/api/leadsubarea", LeadSubAreaRoute);
app.use("/api/leadcity", LeadCityRoute);
app.use("/api/Task", TaskRoute);
app.use("/api/FinancialProduct", FinancialProductRoute);
app.use("/api/CompanyName", CompanyNameRoute);
app.use("/api/registrar", RegistrarRoute);
app.use("/api/AMC", AMCRoute);
app.use("/api/leadType", LeadTypeRoute);
app.use("/api/occupation-types", OccupationTypeRoute);
app.use("/api/office-diary", OfficeDiaryRoute);
app.use("/api/office-purchase", OfficePurchaseRoute);
app.use("/api/important-documents", ImpDocumentRoute);
app.use("/api/suspect", SuspectRoute);
app.use("/api/prospect", ProspectRoute);
app.use("/api/client", CLientRoute);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Run on ${port} Port`);
});
