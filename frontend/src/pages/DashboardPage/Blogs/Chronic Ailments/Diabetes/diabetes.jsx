import React from "react";
import "./diabetes.css";

const Diabetes = () => {
  return (
    <div className="diabetes-container">
      <h1>Understanding Diabetes</h1>
      <p>
        Diabetes is a chronic condition that affects how the body processes blood sugar (glucose). 
        It can lead to serious complications if not managed properly. There are two main types of diabetes: Type 1 and Type 2.
      </p>

      <h2>What Causes Diabetes?</h2>
      <p>
        Diabetes occurs when the body either cannot produce enough insulin (Type 1) or cannot use insulin effectively (Type 2). 
        Several factors contribute to the development of diabetes:
      </p>
      <ul>
        <li>
          <b>Genetics</b>: Family history can increase the risk of developing diabetes.
        </li>
        <li>
          <b>Obesity</b>: Being overweight increases the likelihood of developing Type 2 diabetes.
        </li>
        <li>
          <b>Poor Diet</b>: A diet high in sugar, processed foods, and low in fiber can contribute to insulin resistance.
        </li>
        <li>
          <b>Lack of Physical Activity</b>: A sedentary lifestyle increases the risk of Type 2 diabetes.
        </li>
      </ul>

      <h2>Types of Diabetes</h2>
      <p>There are three main types of diabetes:</p>
      <ul>
        <li><b>Type 1 Diabetes</b>: An autoimmune condition where the body attacks insulin-producing cells in the pancreas. It typically develops in childhood or early adulthood.</li>
        <li><b>Type 2 Diabetes</b>: A chronic condition where the body becomes resistant to insulin or the pancreas does not produce enough insulin. It is more common in adults, but increasing numbers of children are being diagnosed.</li>
        <li><b>Gestational Diabetes</b>: This type occurs during pregnancy and increases the risk of Type 2 diabetes later in life for both the mother and the child.</li>
      </ul>

      <h2>Symptoms of Diabetes</h2>
      <p>
        Symptoms of diabetes vary depending on the type and how well the condition is managed. Common symptoms include:
      </p>
      <ul>
        <li>Increased thirst and hunger</li>
        <li>Frequent urination</li>
        <li>Fatigue</li>
        <li>Blurry vision</li>
        <li>Slow-healing wounds</li>
        <li>Unexplained weight loss</li>
      </ul>

      <h2>Diagnosis</h2>
      <p>
        Diabetes is diagnosed through blood tests. The following tests are commonly used:
      </p>
      <ul>
        <li><b>Fasting Plasma Glucose (FPG)</b>: Measures blood sugar levels after fasting for at least 8 hours.</li>
        <li><b>Oral Glucose Tolerance Test (OGTT)</b>: Measures blood sugar levels before and after consuming a glucose-rich drink.</li>
        <li><b>A1C Test</b>: Measures average blood sugar levels over the past 2-3 months.</li>
      </ul>

      <h2>Prevention and Management</h2>
      <p>
        Diabetes can be managed effectively with lifestyle changes, medication, and regular monitoring. Here are some key strategies:
      </p>
      <ul>
        <li><b>Healthy Eating</b>: A balanced diet, rich in fruits, vegetables, whole grains, and lean proteins, is essential for managing blood sugar levels.</li>
        <li><b>Regular Exercise</b>: Physical activity helps improve insulin sensitivity and can assist with weight management.</li>
        <li><b>Medications</b>: Depending on the type of diabetes, insulin therapy or oral medications may be prescribed to regulate blood sugar levels.</li>
        <li><b>Regular Monitoring</b>: Checking blood glucose levels regularly helps in managing the disease and preventing complications.</li>
      </ul>

      <h2>Complications of Diabetes</h2>
      <p>
        If not managed properly, diabetes can lead to various health complications, including:
      </p>
      <ul>
        <li>Heart disease and stroke</li>
        <li>Kidney damage (diabetic nephropathy)</li>
        <li>Nerve damage (neuropathy)</li>
        <li>Eye damage (diabetic retinopathy)</li>
        <li>Increased risk of infection and slow-healing wounds</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Diabetes is a manageable condition with the right lifestyle changes, medication, and regular monitoring. 
        Early diagnosis and proactive management are key to preventing complications and leading a healthy life.
      </p>
    </div>
  );
};

export default Diabetes;
