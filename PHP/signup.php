<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlaySpot</title>
  <link rel="stylesheet" href="../CSS/inscription.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css">
</head>
<body>
    <section id="form-section" 
        style="
            margin-left: 1250px;
            margin-bottom: 100px;
    ">
      <h1 id="form-h1">SignUp</h1>
      <div class="form-us">
  


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
        
        // Traitement du formulaire d'inscription
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
            $email = htmlspecialchars(strip_tags(trim($_POST['email'])));
            $password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT);
        
            // Vérification si l'email existe déjà
            $query = "SELECT * FROM users WHERE email = :email";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
        
            if ($stmt->rowCount() > 0) {
                echo "<p style='color:red;'>Cet email est déjà utilisé. Veuillez en essayer un autre.</p>";
            } else {
                // Insérer l'utilisateur dans la base de données
                $insertQuery = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
                $insertStmt = $conn->prepare($insertQuery);
                $insertStmt->bindParam(':name', $name);
                $insertStmt->bindParam(':email', $email);
                $insertStmt->bindParam(':password', $password);
        
                if ($insertStmt->execute()) {
                    // Enregistrer le nom de l'utilisateur dans la session
                    $_SESSION['user_name'] = $name;
                    echo "<p style='color:green;'>Inscription réussie ! Redirection en cours...</p>";
                    header("Location: login.php"); // Redirection vers la page d'accueil
                    exit();
                } else {
                    echo "<p style='color:red;'>Une erreur est survenue lors de l'inscription.</p>";
                }
            }
        }
        ?>
        
  



        <form action="" method="post">
          <input placeholder="Votre nom" type="text" class="cts-input" name="name" required>
          <input placeholder="Votre Email" class="cts-input" type="email" name="email" required>
          <input placeholder="Votre mot de passe" class="cts-input" type="password" name="password" required>
          <input placeholder="Confirmer le mot de passe" class="cts-input" type="password" name="confirm_password" required>
          <button type="submit" class="contact-btn">S'inscrire</button>
        </form>
      </div>
  </section> 

<div>
  
</div>

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
          value: ["#ffa580", "#95a4ff", "#ffc8ff", "#60a5fa", "#93ffc1", "#D62D33", "#FFF7AF"]
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
