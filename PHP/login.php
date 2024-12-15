    <?php
    session_start(); // Démarrage de la session
    
    // Configuration de la base de données
    $host = 'localhost';
    $dbname = 'playSpot';
    $username = 'root';
    $password = '';
    $conn = null;
    
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "<p style='color:red;'>Erreur de connexion : " . $e->getMessage() . "</p>";
    }
    
    // Traitement du formulaire de login
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = htmlspecialchars(strip_tags(trim($_POST['email'])));
        $password = trim($_POST['password']);
    
        // Requête pour vérifier si l'email existe dans la base de données
        $query = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($user && password_verify($password, $user['password'])) {
            // Si l'utilisateur est trouvé et le mot de passe est correct
            $_SESSION['user_name'] = $user['name']; // Enregistrer le nom dans la session
            echo "<p style='color:green;'>Connexion réussie ! Redirection en cours...</p>";
            header("Location: ../HTML/index.html"); // Redirection vers la page d'accueil
            exit();
        } else {
            echo "<p style='color:red;'>Email ou mot de passe incorrect.</p>";
        }
    }
    ?>
    


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlaySpot</title>
  <link rel="stylesheet" href="../CSS/inscription.css">
</head>
<body style="display: flex; justify-content: center; align-items: center;"> 

  <section id="form-section" style="margin-left: 1300px;">
    <h1 id="form-h1">Login</h1>
    <div class="form-us">
        <form action="" method="POST">
          <input placeholder="Votre Email" class="cts-input" type="email" name="email" required>
          <input placeholder="Votre mot de passe" class="cts-input" type="password" name="password" required>
          <button type="submit" class="contact-btn">Se connecter</button>
        </form>
        
        <div id="link-con">
          <p>Vous n'avez pas de compte ? <a href="../PHP/signup.php">S'inscrire</a></p> <!-- Lien vers la page d'inscription -->
        </div>

    </div>
</section> 

  <script type="module">
    import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
    import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";

    async function loadParticles(options) {
      await loadAll(tsParticles);
      await tsParticles.load({ id: "tsparticles", options });
    }

    const configs = {
      particles: {
        destroy: {
          mode: "split",
          split: {
            count: 1,
            factor: { value: { min: 2, max: 4 } },
            rate: { value: 100 },
            particles: {
              life: {
                count: 1,
                duration: { value: { min: 2, max: 3 } }
              },
              move: { speed: { min: 10, max: 15 } }
            }
          }
        },
        number: { value: 80 },
        color: {
          value: ["#ffa580","#ffc8ff", "#95a4ff","#60a5fa", "#93ffc1", "#000", "#FFF7AF"]
        },
        shape: { type: "circle" },
        opacity: { value: 1 },
        size: { value: { min: 10, max: 15 } },
        collisions: { enable: true, mode: "bounce" },
        move: { enable: true, speed: 3, outModes: "bounce" }
      },
      interactivity: {
        events: {
          onClick: { enable: true, mode: "pop" }
        }
      },
      background: { color: "white" }
    };

    loadParticles(configs);
  </script>

  <canvas id="tsparticles"></canvas>

</body>
</html>
