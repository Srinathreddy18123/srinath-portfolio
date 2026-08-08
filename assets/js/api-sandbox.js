/* ==========================================================================
   SIMULATED API DEMO - CONCEPTUAL REST CONTROLLER
   Purely interactive frontend concept demonstrating REST API structure
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const apiEndpoints = {
    'get-fresher-profile': {
      method: 'GET',
      url: '/api/v1/fresher/profile',
      status: 200,
      statusText: 'OK (Simulated)',
      payload: {
        status: 'SUCCESS',
        code: 200,
        developer: {
          name: "Benjaram Srinath Reddy",
          title: "Aspiring Software Developer",
          careerLevel: "Fresher / Entry-Level",
          education: "Master of Computer Applications (MCA)",
          internship: "Software Developer Intern @ Harini Technologies Pvt. Ltd.",
          coreTechnologies: ["Java", "Spring Boot", "REST APIs", "MySQL", "Web Development"]
        },
        notice: "This is a simulated API demonstration for concept preview purposes."
      }
    },
    'get-blood-donation-api': {
      method: 'GET',
      url: '/api/v1/projects/blood-donation/donors',
      status: 200,
      statusText: 'OK (Simulated)',
      payload: {
        status: 'SUCCESS',
        code: 200,
        project: "Blood Donation and Management System",
        github: "https://github.com/Srinathreddy18123/Blood-Donation-Management-System",
        sampleEndpoints: [
          "GET /api/v1/donors - Retrieve donor list",
          "POST /api/v1/donors/register - Register new blood donor",
          "GET /api/v1/blood-inventory/search?group=O_POSITIVE - Search stock",
          "POST /api/v1/requests/create - Create blood request workflow"
        ]
      }
    },
    'get-student-api': {
      method: 'GET',
      url: '/api/v1/projects/student-management/students',
      status: 200,
      statusText: 'OK (Simulated)',
      payload: {
        status: 'SUCCESS',
        code: 200,
        project: "Student Management System REST API",
        architecture: "Controller -> Service -> Repository -> MySQL",
        crudMethodsSupported: ["CREATE (POST)", "READ (GET)", "UPDATE (PUT)", "DELETE (DELETE)"]
      }
    }
  };

  const endpointBtns = document.querySelectorAll('.api-endpoint-btn');
  const urlInput = document.getElementById('apiUrlInput');
  const sendBtn = document.getElementById('sendApiReqBtn');
  const responseStatus = document.getElementById('apiResponseStatus');
  const jsonViewer = document.getElementById('jsonResponseViewer');
  const httpMethodBadge = document.getElementById('httpMethodBadge');

  let currentKey = 'get-fresher-profile';

  function renderEndpoint(key) {
    const config = apiEndpoints[key];
    if (!config) return;

    endpointBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.key === key);
    });

    if (urlInput) urlInput.value = config.url;
    if (httpMethodBadge) {
      httpMethodBadge.textContent = config.method;
      httpMethodBadge.className = `http-method method-${config.method.toLowerCase()}`;
    }

    if (responseStatus) {
      responseStatus.textContent = `${config.status} ${config.statusText}`;
      responseStatus.style.background = 'rgba(16, 185, 129, 0.2)';
      responseStatus.style.color = '#10b981';
    }

    if (jsonViewer) {
      const jsonStr = JSON.stringify(config.payload, null, 2);
      jsonViewer.innerHTML = syntaxHighlightJSON(jsonStr);
    }
  }

  function syntaxHighlightJSON(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      
      let style = '';
      if (cls === 'key') style = 'color: #7ee787; font-weight: 600;';
      else if (cls === 'string') style = 'color: #a5d6ff;';
      else if (cls === 'number') style = 'color: #79c0ff;';
      else if (cls === 'boolean') style = 'color: #ff7b72;';

      return `<span style="${style}">${match}</span>`;
    });
  }

  endpointBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentKey = btn.dataset.key;
      renderEndpoint(currentKey);
    });
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (responseStatus) responseStatus.textContent = 'SIMULATING...';
      setTimeout(() => {
        renderEndpoint(currentKey);
      }, 200);
    });
  }

  if (endpointBtns.length > 0) {
    renderEndpoint('get-fresher-profile');
  }
});
