pipeline {
    agent any
    tools {
        maven 'Maven 3.3.9'
        jdk 'JDK 17'
    }
    environment {
        CATALINA_HOME = "C:\\apache-tomcat-10.1.28"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/neeraj1984/votarportal2023.git'
            }
        }
        stage('Build') {
            steps {
                bat 'mvn clean package'
            }
        }
        stage('Deploy to Tomcat') {
            steps {
                deploy adapters: [tomcat10(credentialsId: 'db4a2ac1-bcd6-4a1b-ab37-fc31cea2ccb2', path: '', url: 'http://localhost:8080')], contextPath: '/', war: '**/target/*.war'
            }
        }
    }
}
