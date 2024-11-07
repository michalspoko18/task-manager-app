import {React, useEffect, useState} from "react"
import render from "react-dom"

const Form = () => {

	const apiKey = '49296a6d-1d34-421b-aa1d-d8785ef99901';
	const token = '156143b8-e8bb-41d4-959a-62fa3a4a06bc';

	const [step, setStep] = useState(0)
	const [formData, setFormData] = useState({})

	const [formDataProfOkna, setFormDataProfOkna] = useState({
		id: '',
		name: '',
	})

	const FormTitles = ['Wybierz profil okna', 'Wybierz typ okna', 'Wybierz rodzaj otwierania']

	const StepDisplay = () => {
		if (step === 0) {
			return <ProfOkna formData={formData} setFormData={setFormData} />
		} else if (step === 1) {
			return <TypOkna formData={formData} setFormData={setFormData} />
		} else {
			return <rodzajOtwarcia formData={formData} setFormData={setFormData} />
		}
	}

	const DisableButton = () => {
		if(document.querySelectorAll('.selected').length === 0) {
			return false;
		}
	}

	return (
		<div className="form">

			<div className="form-container p-5">
				<div className="header">
					<h1>{FormTitles[step]}</h1>
				</div>
				{() => {
					if(step!=0) {
						return (
							<div className="col-3">
								<h2>{formData.selectedProfileId}</h2>
							</div>
						)
					}
				}}
				<div className="body">{StepDisplay()}</div>
				<div className="footer d-flex justify-content-between">
					{step === 0 ? '' :
						<button
						disabled={step === 0}
						onClick={() => {
							setStep((currStep) => currStep - 1)
						}}
						
					>
						Prev
					</button>
}
					<button
						disabled={DisableButton()}
						onClick={() => {
							if (step === FormTitles.length - 1) {
								alert('Success')
								
								console.log(formData)
							} else {
								setStep((currStep) => currStep + 1)
							}
						}}
					>
						{step === FormTitles.length - 1 ? 'Confirm' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	)
}

// ==================================================================================== //
const ProfOkna = ({ formData, setFormData }) => {
	const [profiles, setProfiles] = useState([]); // Przechowuje dane z API
	const apiKey = "49296a6d-1d34-421b-aa1d-d8785ef99901";
	const token = "156143b8-e8bb-41d4-959a-62fa3a4a06bc";
  
	useEffect(() => {
	  // Funkcja pobierająca dane z API
	  const fetchProfiles = async () => {
		try {
		  const response = await fetch('https://api.whokna.pl/creator/v3/getprofilesystems', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  apiKey: apiKey,
			  token: token,
			  language: 'Polish',
			}),
		  });
  
		  const data = await response.json();
		  setProfiles(data); // Ustawienie odpowiedzi API do stanu
		} catch (error) {
		  console.error('Error fetching profiles:', error);
		}
	  };
  
	  fetchProfiles();
	}, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz, po renderze
  
	const handleProfileSelect = (profileId) => {
	  setFormData({ ...formData, selectedProfileId: profileId });
	};
  
	return (
	  <div className="sign-up-container d-flex gap-3">
		{profiles.length > 0 ? (
		  profiles.map((profile) => (
			<div
			  key={profile.id}
			  className={`col-6 profile-option ${
				formData.selectedProfileId === profile.id ? 'selected' : ''
			  }`} // Dodaj klasę 'selected', jeśli profil jest wybrany
			  onClick={() => handleProfileSelect(profile.id)}
			  style={{
				border: formData.selectedProfileId === profile.id ? '2px solid blue' : '1px solid gray',
				padding: '10px',
				marginBottom: '10px',
				cursor: 'pointer',
			  }}
			>
			  <img src={profile.url} alt={profile.name} width="100" height="100" />
			  <div>
				<h3>{profile.name}</h3>
				<p>{profile.description}</p>
			  </div>
			</div>
		  ))
		) : (
		  <p>Ładowanie profili...</p>
		)}
	  </div>
	);
  };

// ==================================================================================== //

const TypOkna = ({ formData, setFormData }) => {
	const [types, setTypes] = useState([]); // Przechowuje dane z API dotyczące typów okien
	const apiKey = "49296a6d-1d34-421b-aa1d-d8785ef99901";
	const token = "156143b8-e8bb-41d4-959a-62fa3a4a06bc";
  
	useEffect(() => {
	  // Funkcja pobierająca dane z API dotyczące typów okien na podstawie systemID
	  const fetchWindowTypes = async () => {
		if (!formData.selectedProfileId) {
		  return; // Nie wykonuj zapytania, jeśli nie wybrano systemu
		}
		try {
		  const response = await fetch('https://api.whokna.pl/creator/v3/getprofiletypes', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  apiKey: apiKey,
			  token: token,
			  language: 'Polish',
			  systemID: formData.selectedProfileId, // systemID na podstawie wybranego profilu
			}),
		  });
  
		  const data = await response.json();
		  setTypes(data); // Ustawienie odpowiedzi API do stanu
		} catch (error) {
		  console.error('Error fetching window types:', error);
		}
	  };
  
	  fetchWindowTypes();
	}, [formData.selectedProfileId]); // Zapytanie uruchomi się, gdy zmieni się wybrany profil (selectedProfileId)
  
	const handleTypeSelect = (typeId) => {
	  // Ustawienie wybranego typu okna w formData
	  setFormData({ ...formData, selectedTypeId: typeId });
	};
  
	return (
	  <div className="window-type-container d-flex">
		{types.length > 0 ? (
		  types.map((type) => (
			<div
			  key={type.id}
			  className={`type-option col-4 ${
				formData.selectedTypeId === type.id ? 'selected' : ''
			  }`} // Dodaj klasę 'selected', jeśli typ okna jest wybrany
			  onClick={() => handleTypeSelect(type.id)}
			  style={{
				border: formData.selectedTypeId === type.id ? '2px solid green' : '1px solid gray',
				padding: '10px',
				marginBottom: '10px',
				cursor: 'pointer',
			  }}
			>
			  <img src={type.url} alt={type.name} width="100" height="100" />
			  <div>
				<h3>{type.name}</h3>
				<p>{type.description}</p>
			  </div>
			</div>
		  ))
		) : (
		  <p>Wybierz system okna, aby zobaczyć dostępne typy...</p>
		)}
	  </div>
	);
  };

// ==================================================================================== //
const rodzajOtwarcia = ({ formData, setFormData }) => {
	return (
		<div className="social-info-container">
			
		</div>
	)
}

// ==================================================================================== //
const Konfigurator = () => {
  return (
    <div className="App">
      <Form/>

    </div>
  );
}


export default Konfigurator
