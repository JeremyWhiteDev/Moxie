import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faBicycle, faBolt, faCode, faCookieBite, faDumbbell, faHammer, faPersonHiking, faPersonSkiing, faPersonSwimming, faRocket } from "@fortawesome/free-solid-svg-icons"

export const ICON_CONSTANTS = [
    "faDumbell",
    "faCode",
    "faHammer",
    "faBicycle",
    "faBolt",
    "faRocket",
    "faPersonHiking",
    "faPersonSwimming",
    "faPersonSkiing",
    "faCookie"

]

export const resolveIcon = (icon: string): IconDefinition => {
    switch (icon) {
        case "faDumbell":
            return faDumbbell
        case "faCode":
            return faCode
        case "faHammer":
            return faHammer
        case "faBicycle":
            return faBicycle
        case "faBolt":
            return faBolt
        case "faRocket":
            return faRocket
        case "faPersonHiking":
            return faPersonHiking
        case "faPersonSwimming":
            return faPersonSwimming
        case "faPersonSkiing":
            return faPersonSkiing
        case "faCookie":
            return faCookieBite
        default:
            return faRocket

    }
}