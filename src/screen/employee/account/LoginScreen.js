import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapInput from "../../../component/BarTapInput/index.js";
import BarTapLoadingIndicator from "../../../component/BarTapLoadingIndicator/index.js";
import { AuthContext } from "../../../service/Context.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function LoginScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [privacyOn, setPrivacyOn] = React.useState(false);
  const [termsOn, setTermsOn] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const { signIn } = useContext(AuthContext);

  const styles = StyleSheet.create({
    content: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    logoContainer: {
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      marginBottom: 50,
    },
    logo: {
      height: 120,
      tintColor: theme.BACKGROUND_IMAGE,
    },
    logoText: {
      color: theme.TEXT_PRIMARY,
      fontSize: 40,
      fontFamily: theme.FONT_MEDIUM,
    },
    privacyPolicy: {
      flex: 1,
      padding: 20,
      color: theme.TEXT_LOW_CONTRAST,
    },
    button__privacy: {
      width: "100%",
    },
    form: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      marginBottom: 20,
      width: "100%",
    },
    links: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    link: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },

    link__text: {
      fontSize: 12,
      color: theme.TEXT_TERTIARY,
    },
    webView: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: theme.BACKGROUND_SECONDARY,
    },
  });

  const PrivacyPolicy = () => (
    <Text style={styles.privacyPolicy}>
      Tungstun, gevestigd aan Wereldtuinenlaan 49 Vleuten Nederland, is
      verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven
      in deze privacyverklaring. Contactgegevens: https://www.tungstun.nl
      Wereldtuinenlaan 49 Vleuten Nederland +31 6 58924036 Persoonsgegevens die
      wij verwerken Tungstun verwerkt uw persoonsgegevens doordat u gebruik
      maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt.
      Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:
      - Voor- en achternaam - Telefoonnummer - E-mailadres Bijzondere en/of
      gevoelige persoonsgegevens die wij verwerken Onze website en/of dienst
      heeft niet de intentie gegevens te verzamelen over websitebezoekers die
      jonger zijn dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd.
      We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij
      raden ouders dan ook aan betrokken te zijn bij de online activiteiten van
      hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld
      worden zonder ouderlijke toestemming. Als u er van overtuigd bent dat wij
      zonder die toestemming persoonlijke gegevens hebben verzameld over een
      minderjarige, neem dan contact met ons op via jort@tungstun.nl, dan
      verwijderen wij deze informatie. Met welk doel en op basis van welke
      grondslag wij persoonsgegevens verwerken Tungstun verwerkt uw
      persoonsgegevens voor de volgende doelen: - U te kunnen bellen of e-mailen
      indien dit nodig is om onze dienstverlening uit te kunnen voeren - U de
      mogelijkheid te bieden een account aan te maken Geautomatiseerde
      besluitvorming Tungstun neemt #responsibility op basis van
      geautomatiseerde verwerkingen besluiten over zaken die (aanzienlijke)
      gevolgen kunnen hebben voor personen. Het gaat hier om besluiten die
      worden genomen door computerprogramma's of -systemen, zonder dat daar een
      mens (bijvoorbeeld een medewerker van Tungstun) tussen zit. Tungstun
      gebruikt de volgende computerprogramma's of -systemen: Bartap API Hoe lang
      we persoonsgegevens bewaren Tungstun bewaart uw persoonsgegevens niet
      langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens
      worden verzameld. Wij hanteren de volgende bewaartermijnen voor de
      volgende (categorieën) van persoonsgegevens: 2 jaar (persoonsgegevens
      binnen Bartap API) Delen van persoonsgegevens met derden Tungstun deelt uw
      persoonsgegevens met verschillende derden als dit noodzakelijk is voor het
      uitvoeren van de overeenkomst en om te voldoen aan een eventuele
      wettelijke verplichting. Met bedrijven die u gegevens verwerken in onze
      opdracht, sluiten wij een verwerkersovereenkomst om te zorgen voor
      eenzelfde niveau van beveiliging en vertrouwelijkheid van uw gegevens.
      Tungstun blijft verantwoordelijk voor deze verwerkingen. Daarnaast
      verstrekt Tungstun uw persoonsgegevens aan andere derden. Dit doen wij
      alleen met uw nadrukkelijke toestemming. Op dit moment deelt Tungstun geen
      persoonsgegevens met derden. Cookies, of vergelijkbare technieken, die wij
      gebruiken Tungstun gebruikt alleen technische en functionele cookies. En
      analytische cookies die geen inbreuk maken op uw privacy. Een cookie is
      een klein tekstbestand dat bij het eerste bezoek aan deze website wordt
      opgeslagen op uw computer, tablet of smartphone. De cookies die wij
      gebruiken zijn noodzakelijk voor de technische werking van de website en
      uw gebruiksgemak. Ze zorgen ervoor dat de website naar behoren werkt en
      onthouden bijvoorbeeld uw voorkeursinstellingen. Ook kunnen wij hiermee
      onze website optimaliseren. U kunt zich afmelden voor cookies door uw
      internetbrowser zo in te stellen dat deze geen cookies meer opslaat.
      Daarnaast kunt u ook alle informatie die eerder is opgeslagen via de
      instellingen van uw browser verwijderen. Gegevens inzien, aanpassen of
      verwijderen U heeft het recht om uw persoonsgegevens in te zien, te
      corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele
      toestemming voor de gegevensverwerking in te trekken of bezwaar te maken
      tegen de verwerking van uw persoonsgegevens door Tungstun en heeft u het
      recht op gegevensoverdraagbaarheid. Dat betekent dat u bij ons een verzoek
      kunt indienen om de persoonsgegevens die wij van u beschikken in een
      computerbestand naar u of een ander, door u genoemde organisatie, te
      sturen. U kunt een verzoek tot inzage, correctie, verwijdering,
      gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van
      uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen
      naar jort@tungstun.nl. Om er zeker van te zijn dat het verzoek tot inzage
      door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs met het
      verzoek mee te sturen. Maak in deze kopie uw pasfoto, MRZ (machine
      readable zone, de strook met nummers onderaan het paspoort),
      paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van
      uw privacy. We reageren zo snel mogelijk, maar binnen vier weken, op uw
      verzoek. Tungstun wil u er tevens op wijzen dat u de mogelijkheid heeft om
      een klacht in te dienen bij de nationale toezichthouder, de Autoriteit
      Persoonsgegevens. Dat kan via de volgende link:
      https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons
      Hoe wij persoonsgegevens beveiligen Tungstun neemt de bescherming van uw
      gegevens serieus en neemt passende maatregelen om misbruik, verlies,
      onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging
      tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd
      zijn of er zijn aanwijzingen van misbruik, neem dan contact op met onze
      klantenservice of via jort@tungstun.nl. Tungstun heeft de volgende
      maatregelen genomen om uw persoonsgegevens te beveiligen: - TLS (voorheen
      SSL) Wij versturen uw gegevens via een beveiligde internetverbinding. Dit
      kunt u zien aan de adresbalk 'https' en het hangslotje in de adresbalk. -
      Beveiligde API door middel van JWT en Spring Security.
    </Text>
  );

  const TermsOfService = () => (
    <Text style={styles.privacyPolicy}>
      Welcome to Bartap! These terms and conditions outline the rules and
      regulations for the use of Bartap. By using this app we assume you accept
      these terms and conditions. Do not continue to use Bartap if you do not
      agree to take all of the terms and conditions stated on this page. The
      following terminology applies to these Terms and Conditions, Privacy
      Statement and Disclaimer Notice and all Agreements: "Client", "You" and
      "Your" refers to you, the person log on this website and compliant to the
      Company’s terms and conditions. "The Company", "Ourselves", "We", "Our"
      and "Us", refers to our Company. "Party", "Parties", or "Us", refers to
      both the Client and ourselves. All terms refer to the offer, acceptance
      and consideration of payment necessary to undertake the process of our
      assistance to the Client in the most appropriate manner for the express
      purpose of meeting the Client’s needs in respect of provision of the
      Company’s stated services, in accordance with and subject to, prevailing
      law of Netherlands. Any use of the above terminology or other words in the
      singular, plural, capitalization and/or he/she or they, are taken as
      interchangeable and therefore as referring to same. Our Terms and
      Conditions were created with the help of the App Terms and Conditions
      Generator from App-Privacy-Policy.com License Unless otherwise stated,
      Bartap and/or its licensors own the intellectual property rights for all
      material on Bartap. All intellectual property rights are reserved. You may
      access this from Bartap for your own personal use subjected to
      restrictions set in these terms and conditions. You must not: Republish
      material from Bartap Sell, rent or sub-license material from Bartap
      Reproduce, duplicate or copy material from Bartap Redistribute content
      from Bartap This Agreement shall begin on the date hereof. Parts of this
      app offer an opportunity for users to post and exchange opinions and
      information in certain areas of the website. Bartap does not filter, edit,
      publish or review Comments prior to their presence on the website.
      Comments do not reflect the views and opinions of Bartap, its agents
      and/or affiliates. Comments reflect the views and opinions of the person
      who post their views and opinions. To the extent permitted by applicable
      laws, Bartap shall not be liable for the Comments or for any liability,
      damages or expenses caused and/or suffered as a result of any use of
      and/or posting of and/or appearance of the Comments on this website.
      Bartap reserves the right to monitor all Comments and to remove any
      Comments which can be considered inappropriate, offensive or causes breach
      of these Terms and Conditions. You warrant and represent that: You are
      entitled to post the Comments on our App and have all necessary licenses
      and consents to do so; The Comments do not invade any intellectual
      property right, including without limitation copyright, patent or
      trademark of any third party; The Comments do not contain any defamatory,
      libelous, offensive, indecent or otherwise unlawful material which is an
      invasion of privacy The Comments will not be used to solicit or promote
      business or custom or present commercial activities or unlawful activity.
      You hereby grant Bartap a non-exclusive license to use, reproduce, edit
      and authorize others to use, reproduce and edit any of your Comments in
      any and all forms, formats or media. Hyperlinking to our App The following
      organizations may link to our App without prior written approval:
      Government agencies; Search engines; News organizations; Online directory
      distributors may link to our App in the same manner as they hyperlink to
      the Websites of other listed businesses; and System wide Accredited
      Businesses except soliciting non-profit organizations, charity shopping
      malls, and charity fundraising groups which may not hyperlink to our Web
      site. These organizations may link to our home page, to publications or to
      other App information so long as the link: (a) is not in any way
      deceptive; (b) does not falsely imply sponsorship, endorsement or approval
      of the linking party and its products and/or services; and (c) fits within
      the context of the linking party’s site. We may consider and approve other
      link requests from the following types of organizations: commonly-known
      consumer and/or business information sources; dot.com community sites;
      associations or other groups representing charities; online directory
      distributors; internet portals; accounting, law and consulting firms; and
      educational institutions and trade associations. We will approve link
      requests from these organizations if we decide that: (a) the link would
      not make us look unfavorably to ourselves or to our accredited businesses;
      (b) the organization does not have any negative records with us; (c) the
      benefit to us from the visibility of the hyperlink compensates the absence
      of Bartap; and (d) the link is in the context of general resource
      information. These organizations may link to our App so long as the link:
      (a) is not in any way deceptive; (b) does not falsely imply sponsorship,
      endorsement or approval of the linking party and its products or services;
      and (c) fits within the context of the linking party’s site. If you are
      one of the organizations listed in paragraph 2 above and are interested in
      linking to our App, you must inform us by sending an e-mail to Bartap.
      Please include your name, your organization name, contact information as
      well as the URL of your site, a list of any URLs from which you intend to
      link to our App, and a list of the URLs on our site to which you would
      like to link. Wait 2-3 weeks for a response. Approved organizations may
      hyperlink to our App as follows: By use of our corporate name; or By use
      of the uniform resource locator being linked to; or By use of any other
      description of our App being linked to that makes sense within the context
      and format of content on the linking party’s site. No use of Bartap's logo
      or other artwork will be allowed for linking absent a trademark license
      agreement. iFrames Without prior approval and written permission, you may
      not create frames around our Webpages that alter in any way the visual
      presentation or appearance of our App. Content Liability We shall not be
      hold responsible for any content that appears on your App. You agree to
      protect and defend us against all claims that is rising on our App. No
      link(s) should appear on any Website that may be interpreted as libelous,
      obscene or criminal, or which infringes, otherwise violates, or advocates
      the infringement or other violation of, any third party rights. Your
      Privacy Please read Privacy Policy. Reservation of Rights We reserve the
      right to request that you remove all links or any particular link to our
      App. You approve to immediately remove all links to our App upon request.
      We also reserve the right to amen these terms and conditions and it’s
      linking policy at any time. By continuously linking to our App, you agree
      to be bound to and follow these linking terms and conditions. Removal of
      links from our App If you find any link on our App that is offensive for
      any reason, you are free to contact and inform us any moment. We will
      consider requests to remove links but we are not obligated to or so or to
      respond to you directly. We do not ensure that the information on this
      website is correct, we do not warrant its completeness or accuracy; nor do
      we promise to ensure that the website remains available or that the
      material on the website is kept up to date. Disclaimer To the maximum
      extent permitted by applicable law, we exclude all representations,
      warranties and conditions relating to our App and the use of this website.
      Nothing in this disclaimer will: limit or exclude our or your liability
      for death or personal injury; limit or exclude our or your liability for
      fraud or fraudulent misrepresentation; limit any of our or your
      liabilities in any way that is not permitted under applicable law; or
      exclude any of our or your liabilities that may not be excluded under
      applicable law. The limitations and prohibitions of liability set in this
      Section and elsewhere in this disclaimer: (a) are subject to the preceding
      paragraph; and (b) govern all liabilities arising under the disclaimer,
      including liabilities arising in contract, in tort and for breach of
      statutory duty. As long as the website and the information and services on
      the website are provided free of charge, we will not be liable for any
      loss or damage of any nature.
    </Text>
  );

  return (
    <BarTapContent navigation={navigation} noHeader>
      {privacyOn ? (
        <>
          <ScrollView>
            <PrivacyPolicy />
          </ScrollView>
          <BarTapButton
            onPress={() => {
              setPrivacyOn(false);
              setTermsOn(false);
            }}
            style={styles.button__privacy}
            text={"Close"}
          />
        </>
      ) : termsOn ? (
        <>
          <ScrollView>
            <TermsOfService />
          </ScrollView>
          <BarTapButton
            onPress={() => {
              setPrivacyOn(false);
              setTermsOn(false);
            }}
            style={styles.button__privacy}
            text={"Close"}
          />
        </>
      ) : (
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMethod={"resize"}
              resizeMode={"contain"}
              source={require("../../../assets/icon.png")}
            />
            <Text style={styles.logoText}>Bartap</Text>
          </View>
          <View style={styles.form}>
            <BarTapInput
              placeholder={"Email adress / username"}
              placeholderTextColor={theme.TEXT_HINT}
              autoCompleteType={"email"}
              value={email}
              onChangeText={setEmail}
              keyboardType={"email-address"}
            />
            <BarTapInput
              placeholder={"Password"}
              placeholderTextColor={theme.TEXT_HINT}
              autoCompleteType={"password"}
              value={password}
              onChangeText={setPassword}
              keyboardType={"default"}
              secureTextEntry={true}
            />
            <BarTapButton
              onPress={() => signIn({ email: email, password: password })}
              text={"Log in"}
              style={styles.button}
            />
            <Text
              onPress={() => navigation.navigate("Register")}
              style={styles.link__text}
            >
              I do not have an account
            </Text>
          </View>
          <View style={styles.links}>
            <TouchableOpacity
              onPress={() => {
                setPrivacyOn(true);
                setTermsOn(false);
              }}
              style={styles.link}
            >
              <Text style={styles.link__text}>Privacy policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                setPrivacyOn(false);
                setTermsOn(true);
              }}
            >
              <Text style={styles.link__text}>Terms of service</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </BarTapContent>
  );
}
