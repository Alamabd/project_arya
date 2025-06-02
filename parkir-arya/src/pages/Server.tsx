import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router";

export default function Server() {
    const history = useHistory()
    const [ip, setIp] = useState<string>('')

    const handleInputIp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(ip.length > 1) {
            localStorage.setItem('ip', ip)
            history.goBack()
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div style={{display: "flex", gap: "10px", paddingLeft: '10px'}}>
                        <button style={{background: "transparent", border: "none"}} onClick={() => history.goBack()}>
                            <svg style={{ width: '30px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
                        </button>
                        <IonToolbar>
                            <IonTitle>Server</IonTitle>
                        </IonToolbar>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonLabel>Masukkan IP Server</IonLabel>
                <form onSubmit={handleInputIp}>
                    <IonInput type="text" fill="outline" placeholder="e.g 192.168.100.1" mode="ios" onChange={(e) => typeof(e.currentTarget.value) == 'string' && setIp(e.currentTarget.value)} />
                    <IonButton type="submit">Submit</IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}