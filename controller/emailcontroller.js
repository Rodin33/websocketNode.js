const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'andriamalazarodin@gmail.com', // Votre adresse principale
    pass: 'mot de passe d application ' // Votre mot de passe d'application
  }
});

const envoyerEmail = async(req,res)=> {
  const {client,messageClient}=req.body;

  const mailOptionsClient = {
    from: 'andriamalazarodin@gmail.com',
    to: client,
    subject: 'Merci pour votre message !',
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p style="font-size: 16px; color: #1a73e8; font-weight: bold;">Bonjour, merci pour votre message !</p>
      <p style="font-size: 14px;">Nous avons bien reçu votre message :</p>
      <blockquote style="background-color: #f0f0f0; padding: 10px; border-left: 4px solid #1a73e8;">
        <em>${messageClient}</em>
      </blockquote>
      <p style="font-size: 14px;">Nous vous répondrons bientôt.</p>
      <p style="font-size: 14px;">En attendant, vous pouvez visiter mon <a href="https://rodintech.netlify.app" style="color: #1a73e8; text-decoration: none;">portfolio</a> pour découvrir mes projets et mes compétences.</p>
      <p style="font-size: 14px; color: #555;">Cordialement,<br>Rodin</p>
    </div>
  `
  };

  const mailOptionsCopie = {
    from: 'andriamalazarodin@gmail.com',
    to: 'andriamalazarbn@gmail.com', // Adresse secondaire
    subject: 'Nouveau message client reçu',
    text: `Un client a envoyé un message : \n\n${messageClient}\n\nDe : ${client}`
  };

  try {
    // Envoi du message au client
    await transporter.sendMail(mailOptionsClient);
    console.log('Message envoyé au client');

    // Envoi de la copie à l’adresse secondaire
    await transporter.sendMail(mailOptionsCopie);
    console.log('Message copié vers l’adresse secondaire');

    // Réponse au frontend
    res.status(200).json({ message: 'Les emails ont été envoyés avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l’envoi d’e-mails :', error);
    res.status(500).json({ message: 'Erreur lors de l’envoi des emails.' });
  }
};

const envoyerNotification = async(req,res)=> {

  const mailOptionsConsulation = {
    from: 'andriamalazarodin@gmail.com',
    to: 'andriamalazarbn@gmail.com', // Adresse secondaire
    subject: 'Consultation',
    text: `Nouvelle consulation`
  };

  try {
    // Envoi du message au client
    await transporter.sendMail(mailOptionsConsulation);
    console.log('Message envoyé au client');

    // Réponse au frontend
    res.status(200).json({ message: 'Consulatation de mon portfolio.' });
  } catch (error) {
    console.error('Erreur lors de l’envoi d’e-mails :', error);
    res.status(500).json({ message: 'Erreur lors de l’envoi des emails.' });
  }
};

module.exports={envoyerEmail,envoyerNotification}
